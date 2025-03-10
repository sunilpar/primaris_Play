import InfiniteMenu from "@/blocks/Components/InfiniteMenu/InfiniteMenu";

type Props = {};

function Legiondetails({}: Props) {
  const items = [
    {
      image:
        "https://res.cloudinary.com/daxgavwpd/image/upload/v1740848293/d_Black_Legion_c_jhb50t.png",

      link: "https://warhammer40k.fandom.com/wiki/Black_Legion",

      title: "Black Legion",

      description: "sons of Horus Lupercal",
    },
    {
      image:
        "https://res.cloudinary.com/daxgavwpd/image/upload/v1740848288/d_Dark_Angels_c_xsa6ij.png",

      link: "https://warhammer40k.fandom.com/wiki/Dark_Angels",

      title: "Dark Angels",

      description: "Sons of Lion El'Jonson",
    },
    {
      image:
        "https://res.cloudinary.com/daxgavwpd/image/upload/v1740848288/d_Space_Wolves_c_pkr2dp.png",

      link: "https://warhammer40k.fandom.com/wiki/Space_Wolves",

      title: "Space Wolves",

      description: "Sons of Leman Russ",
    },
    {
      image:
        "https://res.cloudinary.com/daxgavwpd/image/upload/v1740848288/d_Death_Guard_c_mozsn4.png",

      link: "https://warhammer40k.fandom.com/wiki/Death_Guard",

      title: "Death Guard",

      description: "Sons of Mortarion",
    },
    {
      image:
        "https://res.cloudinary.com/daxgavwpd/image/upload/v1740848287/d_Ultramarines_c_npgypx.png",

      link: "https://warhammer40k.fandom.com/wiki/Ultramarines",

      title: "Ultramarines",

      description: "Sons of Roboute Guilliman",
    },

    {
      image:
        "https://res.cloudinary.com/daxgavwpd/image/upload/v1740848289/d_World_Eaters_c_mc3plm.png",

      link: "https://warhammer40k.fandom.com/wiki/World_Eaters",

      title: "World Eaters ",

      description: "Sons of Angron",
    },
  ];
  return (
    <>
      <div
        className="font-display"
        style={{ height: "100%", position: "relative" }}
      >
        <InfiniteMenu items={items} />
      </div>
    </>
  );
}

export default Legiondetails;
