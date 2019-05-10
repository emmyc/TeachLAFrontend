import React from "react";
import SplitPane from "react-split-pane";
import OutputContainer from "./containers/OutputContainer.js";
import TextViewContainer from "./containers/TextViewContainer";
import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import EditorButton from "./components/EditorButton";
import * as fetch from "../../lib/fetch.js";
import EditorRadio from "./components/EditorRadio.js";
import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY, OUTPUT_ONLY } from "./constants";

import { PANEL_SIZE } from "../../constants";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "../../styles/CustomCM.css";
import "../../styles/Resizer.css";
import "../../styles/Editor.css";

/**------Props-------
 * togglePanel: function to call when you want the Profile Panel to disappear/reapper
 * panelOpen: boolean telling whether the Profile Panel is open or not
 * codeStyle: object used to style the whole container //TODO: rename or move this prop
 */

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveText: "Save code",
      viewMode: CODE_AND_OUTPUT,
      loadingSketch: false,
    };
  }

  //==============React Lifecycle Functions Start===================//
  componentWillMount() {
    this.setState({ loadingSketch: true });
    if (this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
      this.setState({ viewMode: CODE_ONLY });
    }
    
    this.setState({ loadingSketch: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props.screenWidth !== prevProps.screenWidth) {
      if (this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
        if (this.state.viewMode === CODE_AND_OUTPUT) {
          this.setState({ viewMode: CODE_ONLY });
        }
      }
    }
  }


  renderCodeAndOutput = () => (
    <SplitPane
      //makes split pane resizer more consistent
      //bc you can hover over the iframe while dragging
      //and it steals the mouse
      resizerStyle={{
        height: "67px",
        borderLeft: "2px solid #333",
        borderRight: "2px solid #333",
        width: "10px",
      }}
      split="vertical" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
      minSize={
        (this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) * 0.33
      } //minimum size of code is 33% of the remaining screen size
      maxSize={
        (this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) * 0.75
      } //max size of code is 75% of the remaining screen size
      size={
        (this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) / 2
      } //the initial size of the text editor section
      allowResize={true}
    >
      {this.renderCode()}
      {this.renderOutput()}
    </SplitPane>
  );

  updateViewMode = viewMode => {
    this.setState({ viewMode });
  };

  renderCode = () => (
    <div className="code-section">
      <div className="code-section-banner">
        <OpenPanelButtonContainer />
        {/* RENDER SKETCH NAME */}
        <div style={{ marginLeft: "auto" }}>
          <EditorRadio
            viewMode={this.state.viewMode}
            updateViewMode={this.updateViewMode}
            isSmall={this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT}
          />
        </div>
        {/* <EditorButton handleClick={this.handleSave} text={this.state.saveText} /> CHANGE THIS TO A FORK BUTTON */}
      </div>
      <div
        className="text-editor-container"
        style={{
          height: this.props.screenHeight - 61 - 20,
          minHeight: this.props.screenHeight - 61 - 20,
          maxHeight: this.props.screenHeight - 61 - 20,
        }}
      >
        <TextViewContainer key={this.props.mostRecentProgram} />
      </div>
    </div>
  );

  renderOutput = () => (
    <OutputContainer
      viewMode={this.state.viewMode}
      updateViewMode={this.updateViewMode}
      isSmall={this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT}
    />
  );

  renderContent = () => {
    switch (this.state.viewMode) {
      case CODE_ONLY:
        return this.renderCode();
      case OUTPUT_ONLY:
        return this.renderOutput();
      default:
        return this.renderCodeAndOutput();
    }
  };

  render() {
    return <div style={this.props.codeStyle}>{this.renderContent()}</div>;
  }
}

export default View;
