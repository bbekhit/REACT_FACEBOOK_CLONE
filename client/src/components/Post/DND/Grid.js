import styled from "styled-components";
import { setRem, setGridFlex, setWidth, custom } from "../../../styles/helpers";

export const Container = styled.div`
  padding-right: ${setRem(15)};
  padding-left: ${setRem(15)};
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  @media (min-width: 576px) {
    max-width: ${setRem(540)};
  }
  @media (min-width: 768px) {
    max-width: ${setRem(720)};
  }
  @media (min-width: 992px) {
    max-width: ${setRem(960)};
  }
  @media (min-width: 1200px) {
    max-width: ${setRem(1140)};
  }
`;

export const Row = styled.div`
  margin-right: ${setRem(-15)};
  margin-left: ${setRem(-15)};
  display: flex;
  flex-wrap: wrap;
`;

export const Column = styled.div`
  padding: ${setRem(15)};
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.collapse &&
    custom[props.collapse](`
    display: none;
  `)};
  ${({ xs }) => (xs ? setGridFlex(xs) : "flex: 0 0 100%")};
  ${({ xs }) => (xs ? setWidth(xs) : "width: 100%")};
  @media (min-width: 576px) {
    ${({ sm }) => sm && setGridFlex(sm)};
    ${({ sm }) => sm && setWidth(sm)};
  }
  @media (min-width: 768px) {
    ${({ md }) => md && setGridFlex(md)};
    ${({ md }) => md && setWidth(md)};
  }
  @media (min-width: 992px) {
    ${({ lg }) => lg && setGridFlex(lg)};
    ${({ lg }) => lg && setWidth(lg)};
  }
  @media (min-width: 1200px) {
    ${({ xl }) => xl && setGridFlex(xl)};
    ${({ xl }) => xl && setWidth(xl)};
  }
`;
