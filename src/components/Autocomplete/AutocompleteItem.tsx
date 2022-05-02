import React from "react";
import { AutocompleteItem } from "../../types/index";

const AutoCompleteItem = ({
    name,
    capital,
    region,
    onSelectItem,
    text
} : AutocompleteItem) => {
    return (
        <li
        className={'list-group-item'}
            onClick={onSelectItem}
        >
            <div className="row">
                <div className="col text-left">
                    <p className="mb-0 font-weight-bold line-height-1" dangerouslySetInnerHTML={highlightText(text,name)}>
                        
                    </p>
                    <p className="mb-0 badge bg-secondary">{region}</p>
                    <p className="mb-0 ms-2 badge bg-secondary">{capital}</p>
                </div>
            </div>
        </li>
    );
};

const highlightText = (text: string, name:string) => {
    const regex = new RegExp(text, 'gi');
    name = name.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
    const newText = name.replace(regex, '<mark class="highlight">$&</mark>');
    return {__html: newText}
}

export default AutoCompleteItem;