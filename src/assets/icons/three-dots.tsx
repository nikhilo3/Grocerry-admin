import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const ThreeDots = (props: Props) => {
  return (
    <svg
      width="5"
      height="24"
      viewBox="0 0 5 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Group">
        <path
          id="Vector"
          d="M2.49998 4.99997C3.88068 4.99997 4.99995 3.88069 4.99995 2.49998C4.99995 1.11928 3.88068 0 2.49998 0C1.11928 0 0 1.11928 0 2.49998C0 3.88069 1.11928 4.99997 2.49998 4.99997Z"
          fill="currentColor"
        />
        <path
          id="Vector_2"
          d="M2.49998 14.5C3.88068 14.5 4.99995 13.3807 4.99995 12C4.99995 10.6193 3.88068 9.5 2.49998 9.5C1.11928 9.5 0 10.6193 0 12C0 13.3807 1.11928 14.5 2.49998 14.5Z"
          fill="currentColor"
        />
        <path
          id="Vector_3"
          d="M2.49998 24C3.88068 24 4.99995 22.8807 4.99995 21.5C4.99995 20.1193 3.88068 19 2.49998 19C1.11928 19 0 20.1193 0 21.5C0 22.8807 1.11928 24 2.49998 24Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default ThreeDots;
