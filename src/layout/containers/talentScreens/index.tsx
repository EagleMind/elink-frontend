import React, { Fragment, ReactNode } from 'react';

interface ScreenProps {
  children: ReactNode;
}

export function AddCarScreen(props: ScreenProps) {
  return <Fragment>{props.children}</Fragment>;
}

export function EditCarScreen(props: ScreenProps) {
  return <Fragment>{props.children}</Fragment>;
}

export function DisplayCars(props: ScreenProps) {
  return <Fragment>{props.children}</Fragment>;
}

export function AIToolsViewScreen(props: ScreenProps) {
  return <Fragment>{props.children}</Fragment>;
}
