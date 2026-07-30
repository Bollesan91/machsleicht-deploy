/* =====================================================================
   MLQR — minimaler QR-Encoder fuer das Premium-Paket (V2, 30.07.2026)
   Byte-Modus, EC-Level M, Versionen 1-6 (bis ~106 Zeichen — Party-URLs
   sind < 50). Alle 8 Masken mit Penalty-Auswahl (ISO/IEC 18004).
   Self-contained: kein CDN (CSP/Print-Anspruch), laeuft im Browser
   (window.MLQR) und in Node (module.exports) fuer den Decode-
   Roundtrip-Test (jsQR) im Gate.
   API: MLQR.matrix(text) -> Array<Array<0|1>> (ohne Quiet-Zone)
        MLQR.svg(text, {size, dark, light, quiet}) -> SVG-String
   ===================================================================== */
(function(root){
"use strict";

/* ---------- GF(256), Polynom 0x11D ---------- */
var EXP = new Array(512), LOG = new Array(256);
(function(){ var x=1; for(var i=0;i<255;i++){ EXP[i]=x; LOG[x]=i; x<<=1; if(x&0x100) x^=0x11D; } for(var j=255;j<512;j++) EXP[j]=EXP[j-255]; })();
function gmul(a,b){ if(a===0||b===0) return 0; return EXP[LOG[a]+LOG[b]]; }

/* Generator-Polynom fuer n EC-Codewoerter */
function genPoly(n){
  var g=[1];
  for(var i=0;i<n;i++){
    var ng=new Array(g.length+1).fill(0);
    for(var j=0;j<g.length;j++){ ng[j]^=gmul(g[j],EXP[i]); ng[j+1]^=g[j]; }
    g=ng;
  }
  return g; /* Grad n, g[0]=hoechster Koeffizient */
}
function rsEC(data,n){
  /* genPoly liefert AUFSTEIGENDE Koeffizienten — die synthetische Division unten
     braucht ABSTEIGENDE (g[0]=1 fuehrend). Roundtrip-Test-Catch 30.07.:
     ohne reverse() sind ALLE EC-Bytes falsch und jeder Decoder lehnt ab. */
  var g=genPoly(n).slice().reverse(), rem=new Array(n).fill(0);
  for(var i=0;i<data.length;i++){
    var f=data[i]^rem[0];
    rem.shift(); rem.push(0);
    if(f!==0) for(var j=0;j<n;j++) rem[j]^=gmul(g[j+1],f);
  }
  return rem;
}

/* ---------- Versions-Tabelle EC-Level M (uniforme Bloecke, V1-6) ----------
   [Bloecke, Daten-CW je Block, EC-CW je Block] — ISO 18004 Tabelle 9 */
var VER_M = {
  1:[1,16,10], 2:[1,28,16], 3:[1,44,26], 4:[2,32,18], 5:[2,43,24], 6:[4,27,16]
};
var ALIGN = {1:[],2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34]};

function toBytes(str){
  /* UTF-8 (URLs sind ASCII; Umlaute funktionieren trotzdem) */
  if(typeof TextEncoder!=='undefined') return Array.from(new TextEncoder().encode(str));
  var out=[],i,c;
  for(i=0;i<str.length;i++){ c=str.charCodeAt(i);
    if(c<0x80) out.push(c);
    else if(c<0x800){ out.push(0xC0|c>>6,0x80|c&63); }
    else { out.push(0xE0|c>>12,0x80|(c>>6)&63,0x80|c&63); }
  }
  return out;
}

function pickVersion(nBytes){
  for(var v=1;v<=6;v++){ var t=VER_M[v]; if(t[0]*t[1]-2>=nBytes) return v; }
  throw new Error('MLQR: Text zu lang ('+nBytes+' Bytes, max ~'+(VER_M[6][0]*VER_M[6][1]-2)+')');
}

/* ---------- Daten-Codewoerter bauen ---------- */
function dataCodewords(bytes,v){
  var t=VER_M[v], cap=t[0]*t[1];
  var bits=[];
  function push(val,len){ for(var i=len-1;i>=0;i--) bits.push((val>>i)&1); }
  push(4,4);                 /* Modus: Byte */
  push(bytes.length,8);      /* Zaehler: 8 Bit bei V1-9 */
  for(var i=0;i<bytes.length;i++) push(bytes[i],8);
  var maxBits=cap*8;
  var term=Math.min(4,maxBits-bits.length); push(0,term);
  while(bits.length%8) bits.push(0);
  var cw=[];
  for(var j=0;j<bits.length;j+=8){ var b=0; for(var k=0;k<8;k++) b=(b<<1)|bits[j+k]; cw.push(b); }
  var pads=[0xEC,0x11], p=0;
  while(cw.length<cap) cw.push(pads[(p++)%2]);
  return cw;
}

/* ---------- Bloecke + Interleaving ---------- */
function buildCodewords(bytes,v){
  var t=VER_M[v], nb=t[0], dc=t[1], ec=t[2];
  var data=dataCodewords(bytes,v);
  var blocks=[],ecs=[],i,j;
  for(i=0;i<nb;i++){ var d=data.slice(i*dc,(i+1)*dc); blocks.push(d); ecs.push(rsEC(d,ec)); }
  var out=[];
  for(j=0;j<dc;j++) for(i=0;i<nb;i++) out.push(blocks[i][j]);
  for(j=0;j<ec;j++) for(i=0;i<nb;i++) out.push(ecs[i][j]);
  return out;
}

/* ---------- Matrix ---------- */
function buildMatrix(v,codewords,mask){
  var size=17+4*v;
  var m=[],res=[],r,c,i,j;
  for(r=0;r<size;r++){ m.push(new Array(size).fill(0)); res.push(new Array(size).fill(false)); }
  function set(rr,cc,val){ m[rr][cc]=val?1:0; res[rr][cc]=true; }
  function finder(rr,cc){
    for(r=-1;r<=7;r++) for(c=-1;c<=7;c++){
      var y=rr+r,x=cc+c; if(y<0||x<0||y>=size||x>=size) continue;
      var on = r>=0&&r<=6&&c>=0&&c<=6 && !((r>=1&&r<=5&&c>=1&&c<=5) && !(r>=2&&r<=4&&c>=2&&c<=4));
      set(y,x,on);
    }
  }
  finder(0,0); finder(0,size-7); finder(size-7,0);
  /* Timing */
  for(i=8;i<size-8;i++){ if(!res[6][i]) set(6,i,i%2===0); if(!res[i][6]) set(i,6,i%2===0); }
  /* Alignment */
  var ap=ALIGN[v];
  for(i=0;i<ap.length;i++) for(j=0;j<ap.length;j++){
    var cy=ap[i],cx=ap[j];
    if(res[cy][cx]) continue;   /* ueberlappt Finder */
    for(r=-2;r<=2;r++) for(c=-2;c<=2;c++){
      var on=Math.max(Math.abs(r),Math.abs(c))!==1;
      set(cy+r,cx+c,on);
    }
  }
  /* Dark Module + Format-Flaechen reservieren */
  set(size-8,8,1);
  for(i=0;i<9;i++){ if(!res[8][i]) set(8,i,0); if(!res[i][8]) set(i,8,0); }
  for(i=0;i<8;i++){ if(!res[8][size-1-i]) set(8,size-1-i,0); if(!res[size-1-i][8]) set(size-1-i,8,0); }
  /* Daten platzieren (Zickzack von rechts unten) */
  var bitIdx=0,total=codewords.length*8;
  function bitAt(k){ return (codewords[k>>3]>>(7-(k&7)))&1; }
  var col=size-1,up=true;
  while(col>0){
    if(col===6) col--;
    for(i=0;i<size;i++){
      r=up?size-1-i:i;
      for(j=0;j<2;j++){
        c=col-j;
        if(res[r][c]) continue;
        var bit=bitIdx<total?bitAt(bitIdx):0; bitIdx++;
        var masked=applyMask(mask,r,c)?bit^1:bit;
        m[r][c]=masked;
      }
    }
    up=!up; col-=2;
  }
  /* Format-Info (EC M='00', Maske) mit BCH + XOR-Maske */
  var fmt=formatBits(mask);
  var b=function(k){ return (fmt>>(14-k))&1; };
  for(i=0;i<6;i++) m[8][i]=b(i);
  m[8][7]=b(6); m[8][8]=b(7); m[7][8]=b(8);
  for(i=9;i<15;i++) m[14-i][8]=b(i);
  for(i=0;i<7;i++) m[size-1-i][8]=b(i);
  for(i=7;i<15;i++) m[8][size-15+i]=b(i);
  m[size-8][8]=1; /* Dark Module bleibt */
  return m;
}
function applyMask(mask,r,c){
  switch(mask){
    case 0: return (r+c)%2===0;
    case 1: return r%2===0;
    case 2: return c%3===0;
    case 3: return (r+c)%3===0;
    case 4: return (Math.floor(r/2)+Math.floor(c/3))%2===0;
    case 5: return (r*c)%2+(r*c)%3===0;
    case 6: return ((r*c)%2+(r*c)%3)%2===0;
    default:return ((r+c)%2+(r*c)%3)%2===0;
  }
}
function formatBits(mask){
  var data=(0<<3)|mask; /* EC M = '00' */
  var v=data<<10;
  var g=0x537;
  for(var i=14;i>=10;i--) if((v>>i)&1) v^=g<<(i-10);
  return (((data<<10)|v)^0x5412)&0x7FFF;
}

/* ---------- Penalty (Masken-Wahl) ---------- */
function penalty(m){
  var size=m.length,score=0,r,c;
  /* N1: Laeufe >=5 */
  for(r=0;r<size;r++){ var run=1; for(c=1;c<size;c++){ if(m[r][c]===m[r][c-1]) run++; else { if(run>=5) score+=3+run-5; run=1; } } if(run>=5) score+=3+run-5; }
  for(c=0;c<size;c++){ var run2=1; for(r=1;r<size;r++){ if(m[r][c]===m[r-1][c]) run2++; else { if(run2>=5) score+=3+run2-5; run2=1; } } if(run2>=5) score+=3+run2-5; }
  /* N2: 2x2-Bloecke */
  for(r=0;r<size-1;r++) for(c=0;c<size-1;c++){ var s=m[r][c]; if(m[r][c+1]===s&&m[r+1][c]===s&&m[r+1][c+1]===s) score+=3; }
  /* N3: Finder-aehnliche Muster 10111010000 / 00001011101 */
  var P1=[1,0,1,1,1,0,1,0,0,0,0], P2=[0,0,0,0,1,0,1,1,1,0,1];
  function n3line(get){
    for(var a=0;a<=size-11;a++){
      var ok1=true,ok2=true;
      for(var k=0;k<11;k++){ var val=get(a+k); if(val!==P1[k]) ok1=false; if(val!==P2[k]) ok2=false; }
      if(ok1||ok2) score+=40;
    }
  }
  for(r=0;r<size;r++){ (function(rr){ n3line(function(k){ return m[rr][k]; }); })(r); }
  for(c=0;c<size;c++){ (function(cc){ n3line(function(k){ return m[k][cc]; }); })(c); }
  /* N4: Dunkel-Anteil */
  var dark=0; for(r=0;r<size;r++) for(c=0;c<size;c++) dark+=m[r][c];
  var pct=dark*100/(size*size);
  score+=10*Math.floor(Math.abs(pct-50)/5);
  return score;
}

/* ---------- API ---------- */
function matrix(text){
  var bytes=toBytes(String(text));
  var v=pickVersion(bytes.length);
  var cw=buildCodewords(bytes,v);
  var best=null,bestScore=Infinity;
  for(var mk=0;mk<8;mk++){
    var m=buildMatrix(v,cw,mk);
    var s=penalty(m);
    if(s<bestScore){ bestScore=s; best=m; }
  }
  return best;
}
function svg(text,opts){
  opts=opts||{};
  var m=matrix(text), n=m.length;
  var quiet=(opts.quiet!=null?opts.quiet:4), size=opts.size||((n+2*quiet)*4);
  var dark=opts.dark||'#12324A', light=opts.light||'#FFFFFF';
  var total=n+2*quiet, cell=size/total;
  var path='';
  for(var r=0;r<n;r++) for(var c=0;c<n;c++) if(m[r][c])
    path+='M'+((c+quiet)*cell)+' '+((r+quiet)*cell)+'h'+cell+'v'+cell+'h-'+cell+'z';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'" shape-rendering="crispEdges" role="img" aria-label="QR-Code">'
    +'<rect width="'+size+'" height="'+size+'" fill="'+light+'"/>'
    +'<path d="'+path+'" fill="'+dark+'"/></svg>';
}

var MLQR={matrix:matrix,svg:svg};
if(typeof module!=='undefined'&&module.exports) module.exports=MLQR;
else root.MLQR=MLQR;
})(typeof self!=='undefined'?self:this);
