import styled from "styled-components";

export const WrapperButton = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  font-size: 15px;
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#2A3546')};
  border-radius: 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#5D87FF' : '#fff')};
  cursor: pointer;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#5D87FF' : '#EAEFF4')};
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#539BFF')};
  }
`;
