"""Deterministische Pruefung einer MP4-Datei ohne ffmpeg: Box-Struktur, Marken, Dauer, alle Spuren (Video + Ton), Reihenfolge moov/mdat."""
import struct, sys

def boxes(buf, start, end):
    pos = start
    while pos + 8 <= end:
        size, typ = struct.unpack('>I4s', buf[pos:pos+8])
        hdr = 8
        if size == 1:
            size = struct.unpack('>Q', buf[pos+8:pos+16])[0]; hdr = 16
        elif size == 0:
            size = end - pos
        yield typ.decode('latin1'), pos, size, hdr
        if size < hdr: break
        pos += size

def find(buf, start, end, path):
    typ, rest = path[0], path[1:]
    for t, pos, size, hdr in boxes(buf, start, end):
        if t == typ:
            if not rest: return pos, size, hdr
            return find(buf, pos+hdr, pos+size, rest)
    return None

def find_all(buf, start, end, typ):
    return [(pos, size, hdr) for t, pos, size, hdr in boxes(buf, start, end) if t == typ]

def main(path):
    buf = open(path, 'rb').read()
    top = list(boxes(buf, 0, len(buf)))
    order = [t for t, *_ in top]
    print('Bytes:', len(buf))
    print('Top-Level-Boxen:', order)
    ft = find(buf, 0, len(buf), ['ftyp'])
    if ft:
        pos, size, hdr = ft
        print('ftyp major:', buf[pos+hdr:pos+hdr+4].decode('latin1'), 'compat:', [buf[i:i+4].decode('latin1') for i in range(pos+hdr+8, pos+size, 4)])
    moov = find(buf, 0, len(buf), ['moov'])
    if not moov:
        print('ERGEBNIS: kein moov'); return 1
    mpos, msize, mhdr = moov
    mv = find(buf, mpos+mhdr, mpos+msize, ['mvhd'])
    if mv:
        pos, size, hdr = mv
        ver = buf[pos+hdr]
        if ver == 1: ts, dur = struct.unpack('>IQ', buf[pos+hdr+20:pos+hdr+32])
        else: ts, dur = struct.unpack('>II', buf[pos+hdr+12:pos+hdr+20])
        print('mvhd Dauer:', round(dur/ts, 3), 's')
    tracks = []
    for tpos, tsize, thdr in find_all(buf, mpos+mhdr, mpos+msize, 'trak'):
        hd = find(buf, tpos+thdr, tpos+tsize, ['mdia', 'hdlr'])
        handler = buf[hd[0]+hd[2]+8:hd[0]+hd[2]+12].decode('latin1') if hd else '?'
        sd = find(buf, tpos+thdr, tpos+tsize, ['mdia', 'minf', 'stbl', 'stsd'])
        entry = buf[sd[0]+sd[2]+12:sd[0]+sd[2]+16].decode('latin1') if sd else '?'
        sz = find(buf, tpos+thdr, tpos+tsize, ['mdia', 'minf', 'stbl', 'stsz'])
        count = struct.unpack('>I', buf[sz[0]+sz[2]+8:sz[0]+sz[2]+12])[0] if sz else -1
        info = f'Spur {handler}: Codec {entry}, {count} Samples'
        if handler == 'vide':
            tk = find(buf, tpos+thdr, tpos+tsize, ['tkhd'])
            if tk:
                w, h = struct.unpack('>II', buf[tk[0]+tk[1]-8:tk[0]+tk[1]])
                info += f', {w>>16}x{h>>16}'
            avcc = buf.find(b'avcC', sd[0], sd[0]+sd[1]) if sd else -1
            if avcc > 0:
                info += f', Profil {hex(buf[avcc+5])} Level {buf[avcc+7]/10}'
            ss = find(buf, tpos+thdr, tpos+tsize, ['mdia', 'minf', 'stbl', 'stss'])
            if ss: info += f', Keyframes {struct.unpack(">I", buf[ss[0]+ss[2]+4:ss[0]+ss[2]+8])[0]}'
        if handler == 'soun' and sd:
            # mp4a Sample-Entry: channelcount(2) samplesize(2) ... samplerate(4, 16.16)
            e = sd[0]+sd[2]+8
            ch = struct.unpack('>H', buf[e+16:e+18])[0]
            sr = struct.unpack('>I', buf[e+24:e+28])[0] >> 16
            info += f', {ch} Kanaele, {sr} Hz'
            esds = buf.find(b'esds', sd[0], sd[0]+sd[1])
            info += ', esds ' + ('ja' if esds > 0 else 'FEHLT')
        tracks.append((handler, entry, count)); print(info)
    faststart = 'moov' in order and 'mdat' in order and order.index('moov') < order.index('mdat')
    print('fastStart (moov vor mdat):', faststart)
    vid = [t for t in tracks if t[0] == 'vide' and t[1] == 'avc1' and t[2] > 0]
    snd = [t for t in tracks if t[0] == 'soun' and t[1] == 'mp4a' and t[2] > 0]
    print('Video-Spur:', 'OK' if vid else 'FEHLT', '· Ton-Spur (AAC):', 'OK' if snd else 'keine')
    ok = bool(ft and mv and vid and faststart)
    print('ERGEBNIS:', 'OK' if ok else 'FEHLT ETWAS')
    return 0 if ok else 1

if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
