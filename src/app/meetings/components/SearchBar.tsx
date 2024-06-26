import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface Props {
    name: string;
    setName: (name: string) => void;
}

export default function SearchBar({ name, setName }: Props) {
    return (
        <div className="w-full flex justify-center mt-6">
            <div className="w-1/2">
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
            </div>
        </div>
    )
}