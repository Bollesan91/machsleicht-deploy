/* Provider-Abstraktion Umami<-plausible(). Geteilt von allen Motto-Paketen —
   der Shim war 15-mal zu kopieren, inklusive der Queue-Lektion unten. */
// Shim: plausible()-Aufrufe auf umami.track() mappen (Provider-Abstraktion, Konvention CLAUDE.md).
// F11 (Gate 30.07.): Umami laedt mit defer, die ersten Events (paket_view/paket_station) feuern
// nach schnellen Same-Origin-Fetches oft VORHER — der alte Shim verwarf sie still (Undercount
// genau der neuen Station-Metrik). Jetzt: Mini-Queue + Flush, sobald umami da ist.
window.plausible=function(name,opts){
  var props=(opts&&opts.props)||{};
  if(window.umami){ try{ umami.track(name,props); }catch(e){} return; }
  try{ window.plausible.q.push([name,props]); }catch(e){}
};
window.plausible.init=function(){};window.plausible.q=[];
(function(){
  var tries=0;
  var iv=setInterval(function(){
    tries++;
    if(window.umami){
      clearInterval(iv);
      var q=window.plausible.q||[]; window.plausible.q=[];
      q.forEach(function(e){ try{ umami.track(e[0],e[1]); }catch(x){} });
    } else if(tries>40){
      clearInterval(iv);
      /* ~10 s: Tracker blockiert/Spaetlader -> Queue wirklich verwerfen und nie mehr anfuellen
         (Re-Check-Nit: vorher log der Kommentar, q wuchs still weiter). Direkt-Track bleibt,
         falls Umami doch noch spaeter laedt. */
      window.plausible=function(name,opts){ if(window.umami){ try{ umami.track(name,(opts&&opts.props)||{}); }catch(e){} } };
    }
  },250);
})();
