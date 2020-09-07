import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Space ,Button} from 'antd';
import {clone} from "@babel/types";
import Axios from "../Module/Axios";
import axios from "axios";
import Cookies from 'js-cookie'
import {url} from "../Constants/constants"
const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = (props) => {
    console.log(props)
    const [form] = Form.useForm();
    const [data, setData] = useState(props.dataSource);
    const [editingKey, setEditingKey] = useState('');
    const [addAvailable,setAddAvailable] = useState(true)
    //强制更新dataSource，解决复用组件时的传值错乱问题
    useEffect(()=>setData(props.dataSource),[props.TableName])
    const isEditing = record => record.key === editingKey;
    const edit = record => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
        setAddAvailable(false)
    };

    const cancel = (record) => {
        let flag=true
        for(let key in record){
            if(!record[key]){
                flag=false;
                break
            }
        }
        if(!flag)
            handleDelete(record.key)
        setEditingKey('');
        setAddAvailable(true)
    };
    const handleDelete = key => {
        const newData = [...data];
        const index = newData.findIndex(item => key === item.key);
        setData(newData.filter(item => item.key !== key))
        let formData = new FormData();
        if(props.TableName=='ticketHolder'){
            formData.append('ticketHolderId',data[index].ticketHolderId)
        }else{
            formData.append('receiverId',data[index].receiverId)
        }
        Axios.post(url+props.deleteUrl,formData)

    };
    const handleAdd = () => {
        let newDataItem={...data[0]}
        for(let ObjectKey in newDataItem) {
            newDataItem[ObjectKey] = null
        }
        newDataItem.key='temp'+data.length.toString()
        setData([...data,newDataItem])
        edit(newDataItem)
    };

    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
            axios.post(url+props.updateUrl+'?userId='+Cookies.getJSON('userId'),JSON.stringify(newData[index]),{headers:{'Content-Type':'application/json'}})
                .then(
                    (response)=>{
                        console.log(response.data)
                    }
                )
            setAddAvailable(true)
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
            ...props.columns,
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return (
                    <Space>
                        {editable
                            ? (
                                <span>
                                    <a
                                        href="javascript:;"
                                        onClick={() => save(record.key)}
                                        style={{
                                            marginRight: 8,
                                        }}
                                    >
                                      Save
                                    </a>
                                    <Popconfirm title="Sure to cancel?" onConfirm={()=>cancel(record)}>
                                      <a>Cancel</a>
                                    </Popconfirm>
                                </span>)
                            : (
                                <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    Edit
                                </a>
                            )
                        }
                        <Popconfirm title="Sure to delete?" onConfirm={() =>handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ];
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType:'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    console.log(data)
    return (
        <Form form={form} component={false}>
            <Button
                onClick={()=>handleAdd()}
                type="primary"
                style={{
                    marginBottom: 5,
                    marginTop: 5
                }}
                disabled={!addAvailable}
            >
                {props.TableName=='ticketHolder'?"添加常用观影人":"添加常用取票人"}
            </Button>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export {EditableTable}
