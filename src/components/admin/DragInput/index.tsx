import React from 'react'
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd'
import { DatePicker } from '@mui/x-date-pickers'
import { styled } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { parseISO, format, startOfMonth, endOfMonth } from 'date-fns'
import { useForm, FieldPath, FieldValues, Controller } from 'react-hook-form'

import {
    DragItem,
    DataShell,
    Button,
    InputComponent,
    SelectInput,
    InputRegister,
} from '@/components/common'
import { InputItem } from '@/types/table'
import add from '@icon/add_primary.svg'
import { Tag } from '@/components/admin'
import uploadImage from '@/lib/uploadImage'
import { useCreateProductMutation } from '@/services/modules/product'
import { Plan } from '@/types/product'
import { JOIN_OPTIONS } from '@/definitions/joinForm'

interface Props {
    label: string
    type: string
    onAdd: (type: string) => void
    onDragEnd: (result: DropResult, type: string) => void
    dragItems: InputItem[]
    onChange: (type: string, value: string, id: string) => void
    onDelete: (type: string, id: string) => void
}

const DragInput: React.FC<Props> = ({
    label,
    type,
    onAdd,
    onDragEnd,
    dragItems,
    onChange,
    onDelete,
}) => {
    return (
        <div>
            <div className="mb-4 flex items-center space-x-3">
                <label className="text-small2 text-white md:text-small1">
                    {label}
                </label>
                <Button
                    type="button"
                    title="error-modal-button"
                    className=" hover:bg-gary-2 border-gray-3 bg-gray-2 p-2 px-4 hover:border-primary hover:text-white"
                    onClick={() => onAdd(type)}>
                    <div className="flex items-center space-x-0.5">
                        <p className="text-sm">新增</p>
                        <Image src={add} alt="add" width={16} height={16} />
                    </div>
                </Button>
            </div>

            <div className="space-y-4">
                <DragDropContext
                    onDragEnd={(result: DropResult) => onDragEnd(result, type)}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="space-y-4">
                                {dragItems.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                <DragItem
                                                    value={item.content}
                                                    onChange={(e) =>
                                                        onChange(
                                                            type,
                                                            e.target.value,
                                                            item.id,
                                                        )
                                                    }
                                                    onDelete={() =>
                                                        onDelete(type, item.id)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}

export default DragInput
