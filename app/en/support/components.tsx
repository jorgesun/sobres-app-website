import type { ComponentProps } from "react";
import * as Base from "../../soporte/components";

/*
 * Las mismas piezas de la ayuda en español, con el idioma fijo en inglés. Las
 * que reciben `slug` (PageHeader, PrevNext) ya saben su idioma por la ruta; las
 * demás no tienen de dónde sacarlo, así que se les pasa aquí y las páginas en
 * inglés no tienen que acordarse.
 */

export {
  PageHeader,
  PrevNext,
  Steps,
  WhatIf,
  WhatIfItem,
  Flow,
  FlowBox,
  FlowArrow,
  CardGrid,
  SopCard,
  Screenshot,
  ScreenshotRow,
  BigCta,
  TableWrap,
  MoneyRow,
} from "../../soporte/components";

export function Toc(props: Omit<ComponentProps<typeof Base.Toc>, "lang">) {
  return <Base.Toc {...props} lang="en" />;
}

export function Callout(props: Omit<ComponentProps<typeof Base.Callout>, "lang">) {
  return <Base.Callout {...props} lang="en" />;
}

export function Money(props: Omit<ComponentProps<typeof Base.Money>, "lang">) {
  return <Base.Money {...props} lang="en" />;
}

export function Shot(props: Omit<ComponentProps<typeof Base.Shot>, "lang">) {
  return <Base.Shot {...props} lang="en" />;
}
