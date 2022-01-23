import { Button } from 'grommet'
import React from 'react'
import "./ToolBar.css"

export default function ToolBar() {
  return (
    <div id="toolbar">
      <center>
        <Button onClick={() => window.location.reload()}>YouTrack</Button>
      </center>
    </div>
  )
}