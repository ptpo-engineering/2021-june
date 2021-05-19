import React, { useEffect, useReducer } from 'react';
import VexFlow from 'vexflow';

const VexFlowComponent = () => {
    const VF = VexFlow.Flow
    const { Formatter, Renderer, Stave, Voice, StaveNote } = VF

    const containerRef = React.createRef();

    useEffect(() => {
        const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);

        const context = renderer.getContext()
        var note_data = [
            { keys: ["f/4"], duration: "8" },
            { keys: ["e/4"], duration: "8" },
            { keys: ["d/4"], duration: "8" },
            { keys: ["c/4"], duration: "16" },
            { keys: ["c/4"], duration: "16" },
            { keys: ["c/5"], duration: "8" },
            { keys: ["b/4"], duration: "8" },
            { keys: ["c/5"], duration: "8" },
            { keys: ["c/5"], duration: "32" },
            { keys: ["c/5"], duration: "32" },
            { keys: ["b/4"], duration: "32" },
            { keys: ["f/4"], duration: "32" }
        ];

        function createNote(note_data) {
            return new StaveNote(note_data);
        }
        var stave = new VF.Stave(110, 60, 90);
        var formatter = new Formatter();
        var notes = note_data.map(createNote);
        var voice = new Voice(VF.TIME4_4);

        voice.addTickables(notes);
        formatter.joinVoices([voice]).formatToStave([voice], stave);
        voice.draw(context, stave);
    })
    return (<div ref={containerRef}></div>)
}

export default VexFlowComponent;