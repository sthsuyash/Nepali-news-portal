import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Search as AiOutlineSearch } from "lucide-react";
import Input from "../../components/ui/Input";

const Search = () => {
  const [state, setState] = useState('');
  const navigate = useNavigate(); // React Router navigate function

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/news?q=${state}`); // Navigate to search results page
    setState(''); // Clear input field after submitting
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <form onSubmit={search} className="flex">
        <div className="w-[calc(100%)] h-[45px]">
          <Input
            icon={AiOutlineSearch} 
            type="text"
            required
            value={state}
            onChange={(e) => setState(e.target.value)} // Update state on input change
            className="w-full h-full p-2 border border-slate-300 outline-none bg-slate-100"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
