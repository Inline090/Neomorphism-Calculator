import React from "react";
import styled from "styled-components";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Switch: React.FC<Props> = ({ checked, onChange }) => {
  return (
    <StyledWrapper>
      <div className="switch-container">
        <input
          className="toggle-checkbox"
          id="toggle-switch"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <label className="switch" htmlFor="toggle-switch">
          <div className="toggle">
            <div className="led" />
          </div>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch-container {
    position: relative;
    width: 110px;
    height: 40px;
    background: #d6d6d6;
    border-radius: 30px;
    box-shadow:
      inset -6px -6px 12px #ffffff,
      inset 6px 6px 12px #b0b0b0;
  }

  .toggle-checkbox {
    display: none;
  }

  .switch {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateY(-50%);
    border-radius: 50px;
    overflow: hidden;
    cursor: pointer;
  }

  .toggle {
    position: absolute;
    width: 50px;
    height: 30px;
    background: linear-gradient(145deg, #d9d9d9, #bfbfbf);
    border-radius: 30px;
    top: 5px;
    left: 5px;
    box-shadow:
      -3px -3px 6px #ffffff,
      3px 3px 6px #b0b0b0;
    transition: all 0.25s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 8px;
  }

  .led {
    width: 8px;
    height: 8px;
    background: grey;
    border-radius: 50%;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.15);
    transition: all 0.25s ease-in-out;
  }

  .toggle-checkbox:checked + .switch .toggle {
    left: 55px;
    background: linear-gradient(145deg, #cfcfcf, #a9a9a9);
    box-shadow:
      -3px -3px 6px #ffffff,
      3px 3px 6px #8a8a8a;
  }

  .toggle-checkbox:checked + .switch .led {
    background: yellow;
    box-shadow: 0 0 15px 4px yellow;
  }

  .switch:hover .toggle {
    box-shadow:
      -4px -4px 12px #ffffff,
      4px 4px 12px #9b9b9b;
  }
`;

export default Switch;
