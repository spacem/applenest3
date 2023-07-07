import { Bag } from '@apple-nest-3/apple-nest-interfaces';

interface BagProps {
  bag?: Bag;
}

export const BagContents = (props: BagProps) => {
  const bag = props?.bag;
  return (
    <div className="inventory">
      <div>
        <div>Money</div>
        <img className="inventory" alt="Farmer" src="assets/money.jpg" height="100%"></img>
        <div>{bag?.money || 0}</div>
      </div>


      <div>
        <div>Apples</div>
        <img className="inventory" alt="Farmer" src="assets/apples.jpg" height="100%"></img>
        <div>{bag?.apples || 0}</div>
      </div>

      <div>
        <div>Seeds</div>
        <img className="inventory" alt="Farmer" src="assets/seeds.jpg" height="100%"></img>
        <div>{bag?.seeds || 0}</div>
      </div>
    </div>
  );
};
