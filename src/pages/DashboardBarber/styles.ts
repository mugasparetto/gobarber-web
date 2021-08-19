import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 2rem 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 2rem;

  @media all and (max-width: 31.25em) {
    padding: 0 1rem;
  }

  > img {
    height: 5rem;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;

  @media all and (max-width: 31.25em) {
    margin-left: auto;
  }

  a {
    text-decoration: none;
  }

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;

    @media all and (max-width: 24em) {
      display: none;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    line-height: 1.5rem;

    @media all and (max-width: 24em) {
      margin-left: 0;
    }

    span {
      color: #f4ede8;
      font-size: 1rem;
    }

    strong {
      color: #ff9000;
      font-size: 1rem;
    }
  }
`;

export const Content = styled.main`
  max-width: 70rem;
  margin: 4rem auto;
  padding: 0 2rem;
  display: flex;

  @media all and (max-width: 55.625em) {
    flex-direction: column-reverse;
  }

  @media all and (max-width: 31.25em) {
    padding: 0 1rem;
  }
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 7.5rem;

  @media all and (max-width: 63.75em) {
    margin-right: 4rem;
  }

  @media all and (max-width: 55.625em) {
    margin-right: 0;
    margin-top: 3rem;
  }

  h1 {
    font-size: 2.25rem;
  }

  p {
    margin-top: 0.5rem;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
      font-size: 1rem;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 0.75rem;
      background: #ff9000;
      margin: 0 0.5rem;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 4rem;

  > strong {
    color: #999591;
    font-size: 1.25rem;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border-radius: 0.625rem;
    margin-top: 1.5rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: #ff9000;
    }

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;

      @media all and (max-width: 24em) {
        width: 3.5rem;
        height: 3.5rem;
      }
    }

    strong {
      margin: 0 1rem;
      color: #fff;
      font-size: 1rem;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;
      font-size: 1rem;

      svg {
        color: #ff9000;
        margin-right: 0.5rem;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 3rem;

  p {
    margin-bottom: 1rem;
  }

  > strong {
    color: #999591;
    font-size: 1.25rem;
    line-height: 1.5rem;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  > p {
    color: #999591;
    font-size: 1rem;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 1rem;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 4.5rem;
    font-size: 1rem;

    svg {
      color: #ff9000;
      margin-right: 0.5rem;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border-radius: 0.625rem;
    margin-left: 1.5rem;

    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;

      @media all and (max-width: 24em) {
        display: none;
      }
    }

    strong {
      margin-left: 1.5rem;
      color: #fff;
      font-size: 1.25rem;
    }
  }
`;

export const Calendar = styled.aside`
  width: 23.75rem;

  @media all and (max-width: 55.625em) {
    margin: 0 auto;
  }

  @media all and (max-width: 31.25em) {
    width: auto;
  }

  .DayPicker {
    border-radius: 0.625rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 0.625rem;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5rem;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 0.5rem;
    margin: 1rem 0 0 0;
    padding: 1rem;
    background-color: #28262e;
    border-radius: 0 0 0.625rem 0.625rem;

    @media all and (max-width: 24em) {
      border-spacing: 0.25rem;
      padding: 1rem 0;
    }
  }

  .DayPicker-Caption {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 2.5rem;
    height: 2.5rem;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 0.625rem;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 0.625rem;
    color: #232129 !important;
  }

  .DayPicker-Day--past:not(.DayPicker-Day--outside) {
    color: #666360 !important;
    background: ${shade(0.25, '#3e3b47')} !important;
  }

  .DayPicker-Day--past:not(.DayPicker-Day--outside).DayPicker-Day--selected {
    background: #ff9000 !important;
    color: #232129 !important;
  }

  .DayPicker-Day--past:not(.DayPicker-Day--outside).DayPicker-Day--selected:hover {
    background: #ff9000 !important;
    color: #232129 !important;
  }

  .DayPicker-Day--past:not(.DayPicker-Day--outside):hover {
    color: #666360 !important;
    background: ${shade(0.35, '#3e3b47')} !important;
  }

  .DayPicker-Day--past.DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--highlighted:not(.DayPicker-Day--selected) {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      background: #ff9000;
      top: 0;
      right: 0;
      border-radius: 0 0.625rem 0 0;
    }
  }
`;
