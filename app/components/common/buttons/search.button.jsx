"use client";
import { useSearchDrawer } from "@/store/search-drawer";
import SearchIcon from "@mui/icons-material/Search";
export default function SearchButton() {
    const { set_open } = useSearchDrawer();

  return <SearchIcon onClick={() => set_open(true)} className="cursor-pointer" color="primary" />;
}
