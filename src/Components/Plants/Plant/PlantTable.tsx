import React, { Component } from "react";

import Plants from "../Location/Plants";


//may delete table and migrate Plants component to plantindex.

type PlantIndexProps = {
  sessionData: { authenticated: boolean; token: string | null };
};

class PlantTable extends Component<PlantIndexProps> {
  constructor(props: PlantIndexProps) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <Plants sessionData={this.props.sessionData} />
      </div>
    );
  }
}
export default PlantTable;
