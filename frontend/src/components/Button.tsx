import { default as MUIButton } from "@mui/material/Button";

interface ButtonProps {
  readonly text: string;
  readonly onClick: () => void;
}

export function Button({ text, onClick }: Readonly<ButtonProps>) {
  return (
    <MUIButton variant="contained" onClick={onClick}>
      {text}
    </MUIButton>
  );
}
