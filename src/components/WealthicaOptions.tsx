import React from "react";
import { WealthicaAddonOptions } from "../environment/wealthica-api";

type Props = {
  options: WealthicaAddonOptions;
};

const WealthicaOptions: React.FC<Props> = (props) => (
  <>Wealthica Options: {JSON.stringify(props.options)}</>
);

export default WealthicaOptions;
