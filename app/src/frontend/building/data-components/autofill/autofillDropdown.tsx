import React, { useEffect, useState } from 'react';

import './autofillDropdown.css';

import { apiGet } from '../../../apiHelpers';

interface AutofillDropdownProps {
    fieldName: string;
    fieldValue: string;
    editing: boolean;
    onSelect: (val: string) => void;
    onClose: () => void;
}

interface AutofillOption {
    id: string;
    value: string;
    similarity: number;
}

export const AutofillDropdown: React.FC<AutofillDropdownProps> =  props => {
    const [options, setOptions] = useState<AutofillOption[]>(null);

    useEffect(() => {
        const doAsync = async () => {
            if (!props.editing || props.fieldValue === '') return setOptions(null);

            const url = `/api/autofill?field_name=${props.fieldName}&field_value=${props.fieldValue}`;
            const { options } = await apiGet(url);

            if (!props.editing) return;

            setOptions(options);
        };

        doAsync();
    }, [props.editing, props.fieldName, props.fieldValue]);

    if (!props.editing || options == undefined) return null;

    return (
        <div className="autofill-dropdown">
            {
                options.map(option =>
                    <div
                        onMouseDown={e => /* prevent input blur */ e.preventDefault()}
                        onClick={e => {
                            props.onSelect(option.value);
                            // close dropdown manually rather than through input blur
                            props.onClose();
                        }}
                    >
                        {option.value} ({option.id})
                    </div>)
            }
        </div>
    );

};
