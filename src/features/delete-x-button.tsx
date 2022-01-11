import styled from "styled-components";
import { colors } from "src/utils/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const StyledDeleteXButton = styled(FontAwesomeIcon)`
  color: ${colors.black(0.6)};
  cursor: pointer;
`;

export const DeleteXButton = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}) => {
  return <StyledDeleteXButton icon={faTimes} onClick={onClick} />;
};
