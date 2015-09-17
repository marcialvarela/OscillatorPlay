var cmajor = {};
cmajor.yo = function () {
    var oscs = [], o, i, freqs = [261.63, 329.63, 392];
    freqs.forEach(function(freq) {
        o = audio_context.createOscillator();
        o.frequency.value = freq;
        o.connect(audio_context.destination);
        o.noteOn(0);
        oscs.push(o);
    });
    this.oscs = oscs;
    fire('play', '\n - ' + freqs.join('Hz\n - '));
};

cmajor.no = function () {
    this.oscs.forEach(function(o) {
        o.noteOff(0);
    });
    fire('stop');
};
