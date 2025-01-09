import { useAuthStore } from "@/store/authStore";

const Account = () => {
  const { user } = useAuthStore();
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 relative gap-2 w-full items-center">
        <div className="bg-stone-300 rounded-full h-8 w-8 flex items-center justify-center">
          <span className="text-sm font-bold">{getInitials(user.name)}</span>
        </div>
        <div className="text-start">
          <span className="text-sm font-bold block">{user.name}</span>
          <span className="text-xs block text-stone-500">{user.email}</span>
        </div>
      </button>
    </div>
  );
};

export default Account;