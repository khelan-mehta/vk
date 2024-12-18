interface Membership {
  name: string;
  bg: string;
}

const MembershipCard: React.FC<Membership> = ({
  name,
  bg,
}) => {
  return (
    <div className="mb-5 mt-[-10px] relative self-center">
      <span
        className={`bg-gradient-to-r ${bg} text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105`}
      >
        {name} Membership
      </span>
    </div>
  );
};

export default MembershipCard;
