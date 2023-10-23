interface UserImageAddressProps {
  img: string;
  address: string;
}
export const UserImageAddress = ({ img, address }: UserImageAddressProps) => {
  return (
    <div className="flex gap-1 items-center">
      <img className="rounded-full w-4 h-4" src={img} />
      <div className="text-[10px] text-[#4C4E64AD]">{address} </div>
    </div>
  );
};
