import { Bag } from '@apple-nest-3/apple-nest-interfaces';

interface BagProps {
  bag?: Bag;
}

export const BagContents = (props: BagProps) => {
  const bag = props?.bag;
  return (
    <>
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

        <div>
          <div>Water</div>
          <img className="inventory" alt="Water" src="assets/water.jpg" height="100%"></img>
          <div>{bag?.water || 0}/{bag?.buckets || 0}</div>
        </div>
      </div>
      <div className="inventory">
        {bag?.weapon &&
        <div>
          <div>Weapon</div>
          <img className="inventory" alt="Farmer" src="assets/weapon.jpg" height="100%"></img>
          <div>lv{bag?.weapon || 0}</div>
        </div>}

        {bag?.shield &&
        <div>
          <div>Shield</div>
          <img className="inventory" alt="Water" src="assets/shield.jpg" height="100%"></img>
          <div>lv{bag?.shield || 0}</div>
        </div>}

        {bag?.tickets &&
        <div>
          <div>Tickets</div>
          <img className="inventory" alt="Tickets" src="assets/tickets.jpg" height="100%"></img>
          <div>{bag?.tickets || 0}</div>
        </div>}
      </div>
    </>
  );
};
