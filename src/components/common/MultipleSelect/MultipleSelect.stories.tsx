import React, { useState } from 'react'
import MultipleSelect from './MultipleSelect'

export default {
    title: 'common/MultipleSelect',
    component: MultipleSelect,
}

const areaOptions = [
    { label: '台北市', value: 'tpi' },
    { label: '新北市', value: 'ntp' },
    { label: '桃園市', value: 'tow' },
    { label: '新竹市', value: 'sin' },
]

export const Primary = () => {
    const [selectedArea, setSelectedArea] = useState<string[]>([])
    return (
        <div className="bg-bray-1">
            <MultipleSelect
                title={'區域'}
                options={areaOptions}
                selectedValues={selectedArea}
                onSelectChange={setSelectedArea}
            />
        </div>
    )
}
