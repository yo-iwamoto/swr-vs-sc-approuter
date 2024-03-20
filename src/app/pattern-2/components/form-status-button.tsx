"use client";

import { Button } from "@/components/client-ui";
import type { ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentPropsWithoutRef<typeof Button>;

export function FormStatusButton(props: Props) {
  const status = useFormStatus();

  return <Button loading={status.pending} {...props} />;
}
