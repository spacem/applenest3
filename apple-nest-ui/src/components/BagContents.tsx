import { Bag } from 'apple-nest-interfaces';

interface BagProps {
  bag?: Bag;
}

export const BagContents = (props: BagProps) => {
  const bag = props?.bag;
  return <>
      Money: {bag?.money || 0} | Apples: {bag?.apples || 0} | Seeds: {bag?.seeds || 0}
  </>
}
