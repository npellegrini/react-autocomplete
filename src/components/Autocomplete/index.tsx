import React, { useEffect, useMemo, useRef, useState } from "react"
import AutoCompleteItem from "./AutocompleteItem";
import {Item, AutocompleteComponent} from "../../types/index";

const Autocomplete = ({  onSelect, getSources }: AutocompleteComponent) => {
    const [filteredSuggest, setFilteredSuggest] = useState<Item[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [textInput, setTextInput] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<any>();

    const searchContainer = useRef<HTMLDivElement>(null);
    const searchResultRef = useRef<HTMLUListElement>(null);
    const inputTextRef = useRef<HTMLInputElement>(null);

    const WAIT_INTERVAL = 1000;  

    useEffect(() => {
        
        const handleClickOutside = (event: any) => {
            if (
                searchContainer.current &&
                !searchContainer.current.contains(event.target)
            ) {
                hideSuggestion();
            }
        };
        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchContainer]);

    const onChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
        
        clearTimeout(timer)
        setTimer(timer)
        
        const userTextInput = e.target.value;
        setTextInput(userTextInput)
        
        let timerVal = setTimeout(() => triggerRequest(userTextInput), WAIT_INTERVAL);
        setTimer(timerVal)

    }
    const triggerRequest = async (userTextInput:string) => {

        setLoading(true)
        hideSuggestion()
        if (!userTextInput) {
            hideSuggestion()
            setFilteredSuggest([])
            setLoading(false)
            
            return
        }
        let dataFiltered = await getSources(userTextInput);
        setFilteredSuggest(dataFiltered)
        setLoading(false)
        showSuggestion()
}

    const showSuggestion = () => setIsVisible(true);

    const hideSuggestion = () => setIsVisible(false);

    
    return <>
        <div className="search-bar-container" ref={searchContainer}>
            <div>
                <input className="form-control"
                    type="text"
                    ref={inputTextRef}
                    onChange={onChange}
                    onClick={showSuggestion}
                    value={textInput}

                />
            </div>
            {isLoading && (<div className="loading-container">
                <div className="lds-dual-ring"></div>
            </div>)}

            <div
                className={`search-result ${isVisible ? "visible" : "invisible"}`}
            >
                <ul className="list-group" ref={searchResultRef}>
                    {filteredSuggest.map((item: Item) => (
                        <AutoCompleteItem
                            key={item.name}
                            onSelectItem={() => {
                                hideSuggestion();
                                setTextInput(item.name);
                                onSelect(item);
                            }}
                            text={textInput}
                            {...item}
                        />
                    ))}
                </ul>
            </div>

        </div>
    </>

}

export default Autocomplete