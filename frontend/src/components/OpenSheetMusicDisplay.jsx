import React, { useEffect, useReducer } from 'react';
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay';

const OpenSheetMusicDisplay = ({ file, autoResize = true, drawTitle = true }) => {
  let osmd = undefined;
  const containerRef = React.createRef();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const loadOsmd = () => {
    if (osmd === undefined) {
      osmd = new OSMD(containerRef.current, { alignRests: 1, backend: "canvas", autoResize: autoResize, drawTitle: drawTitle });
    }
    if (containerRef.current !== null && containerRef.current.children.length > 0) {
      containerRef.current.removeChild(containerRef.current.children[0])
    }
    osmd.load(file).then(() => osmd.render())
  }

  useEffect(() => {
    console.log(file)
    loadOsmd()
  }, [file])

  return (<div className="sheetContainer" ref={containerRef} />);
}

export default OpenSheetMusicDisplay;
