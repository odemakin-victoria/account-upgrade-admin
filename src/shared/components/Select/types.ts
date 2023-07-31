export interface ISelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    options?: {
        label: string;
        value: string;
      }[];

}
