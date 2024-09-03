import { PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface Props {
    name: string;
    setName: (name: string) => void;
    onPlus: () => void;
}

export default function SearchBar({ name, setName, onPlus }: Props) {
    return (
        <div className="w-full flex justify-center mt-6">
            <div className="w-1/2 flex flex-row items-center">
                <InputGroup>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Search for a meeting"
                        className=" text-white border rounded-lg focus:outline-none"
                    />
                    <InputRightElement>
                        <SearchIcon color='' />
                    </InputRightElement>
                </InputGroup>
                <PlusSquareIcon width="10" height="10" className="text-white ml-2 hover:cursor-pointer" onClick={onPlus}/>
            </div>
        </div>
    )
}