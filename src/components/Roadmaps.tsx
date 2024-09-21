import  ReactFlow, { addEdge, useEdgesState, useNodesState } from 'react-flow-renderer'; 
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';
import Playground from './Playground';
 
const initialNodes = [
  
    { 
        id: '1', 
        position: { x: 0, y: 0 },
        data: { label: 'DNS & How Internet Works' }, 
        style : {backgroundColor : "#f9f0e6" , minWidth :"200px" , border : "1px solid #ffc079" }
    },
    {
        id: '2', 
        position: { x: 0, y: 100 }, 
        data: { label: 'HTML & CSS' } ,
        style : {backgroundColor : "#f9f0e6" , minWidth :"200px" , border : "1px solid #ffc079" }
    },
    {
        id : '4' ,
        position  : {x : -30 , y: 450 },
        data: {label : 'JAVASCRIPT'},
        style : {backgroundColor : "#f9f0e6" , minWidth :"200px" , border : "1px solid #ffc079" }
    },
    {
        id : '5' ,
        position  : {x : 30 , y: 600 },
        data: {label : 'Tailwind CSS'},
        style : {backgroundColor : "#f9f0e6" , minWidth :"200px" , border : "1px solid #ffc079" }
    },
    { 
        id : '6' , 
        position  : {x : -30 , y: 700 },
        data: {label : 'React' , },
        style : {backgroundColor : "#f9f0e6" , minWidth :"200px" , border : "1px solid #ffc079" }
    },
    {
        id : '8' ,
        position  : {x : -30 , y: 1000 },
        data: {label : 'React State Management Libraries'},
        style : {backgroundColor : "#f9f0e6" , minWidth :"200px" , border : "1px solid #ffc079" }
    },
    {
        id : '9' ,
        position  : {x : 30 , y: 1200 },
        data: {label : 'Typescript'},
        style : {backgroundColor : "#f9f0e6" , minWidth :"200px" , border : "1px solid #ffc079" }
    },
    {
        id: '10',
        type: 'group',
        position: {
          x: -270,
          y: -10,
        },
        style: {
          width: 100,
          height: 85,
          backgroundColor: '#f4f4f5',
          border: "none",
          borderRadius : "10px"
        },
    },
    {
        id : '11' ,
        position  : {x : -258.5 , y: 0},
        data: {label : 'DNS'},
        style : {backgroundColor : "#ddedfa" , width :"75px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '12' ,
        position  : {x : -258.5 , y: 35},
        data: {label : 'HTTP'},
        style : {backgroundColor : "#ddedfa" , width :"75px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id: 'g2',
        type: 'group',
        position: {
          x: -290,
          y: 105,
        },
        style: {
          width: 230,
          height: 210,
          backgroundColor: '#f4f4f5',
          border: "none",
          borderRadius : "10px"
        },
    },
    {
        id : '13' ,
        position  : {x : -275 , y: 115},
        data: {label : 'HTML Fundamentals'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '14' ,
        position  : {x : -275 , y: 155},
        data: {label : 'CSS Fundamentals'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '15' ,
        position  : {x : -275 , y: 195},
        data: {label : 'Positioning in CSS'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '16' ,
        position  : {x : -275 , y: 235},
        data: {label : 'CSS Flexbox'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '17' ,
        position  : {x : -275 , y: 275},
        data: {label : 'CSS Grid'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id: 'g3',
        type: 'group',
        position: {
          x: 248.5,
          y: 100,
        },
        style: {
          width: 220,
          height: 130,
          backgroundColor: '#f4f4f5',
          border: "none",
          borderRadius : "10px"
        },
    },
    {
        id : '18' ,
        position  : {x : 258.5 , y: 110},
        data: {label : 'Semantic HTMl'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '19' ,
        position  : {x : 258.5 , y: 150},
        data: {label : 'Media Queries'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '20' ,
        position  : {x : 258.5 , y: 190},
        data: {label : 'CSS Animations'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id: 'g4',
        type: 'group',
        position: {
          x: 340,
          y: 440,
        },
        style: {
          width: 120,
          height: 170,
          backgroundColor: '#f4f4f5',
          border: "none",
          borderRadius : "10px"
        },
    },
    {
        id : '21' ,
        position  : {x : 350 , y: 450},
        data: {label : 'Variables'},
        style : {backgroundColor : "#ddedfa" , width :"100px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '22' ,
        position  : {x : 350 , y: 490},
        data: {label : 'Functions'},
        style : {backgroundColor : "#ddedfa" , width :"100px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '23' ,
        position  : {x : 350 , y: 530},
        data: {label : 'Objects'},
        style : {backgroundColor : "#ddedfa" , width :"100px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '24' ,
        position  : {x : 350 , y: 570},
        data: {label : 'DOM'},
        style : {backgroundColor : "#ddedfa" , width :"100px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id: 'g5',
        type: 'group',
        position: {
          x: -360,
          y: 440,
        },
        style: {
          width: 220,
          height: 130,
          backgroundColor: '#f4f4f5',
          border: "none",
          borderRadius : "10px"
        },
    },
    {
        id : '25' ,
        position  : {x : -350 , y: 450},
        data: {label : 'Scoping'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '26' ,
        position  : {x : -350 , y: 490},
        data: {label : 'Promises'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '27' ,
        position  : {x : -350 , y: 530},
        data: {label : 'Inheritance'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id: 'g6',
        type: 'group',
        position: {
          x: -310,
          y: 640,
        },
        style: {
          width: 220,
          height: 170,
          backgroundColor: '#f4f4f5',
          border: "none",
          borderRadius : "10px"
        },
    },
    {
        id : '28' ,
        position  : {x : -300 , y: 650},
        data: {label : 'Basics'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '29' ,
        position  : {x : -300 , y: 690},
        data: {label : 'hooks'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '30' ,
        position  : {x : -300 , y: 730},
        data: {label : 'React Context'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '31' ,
        position  : {x : -300 , y: 770},
        data: {label : 'Design Patterns'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id: 'g7',
        type: 'group',
        position: {
          x: 340,
          y: 680,
        },
        style: {
          width: 220,
          height: 90,
          backgroundColor: '#f4f4f5',
          border: "none",
          borderRadius : "10px"
        },
    },
    {
        id : '32' ,
        position  : {x : 350 , y: 690},
        data: {label : 'useSWR'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '33' ,
        position  : {x : 350 , y: 730},
        data: {label : 'React Query'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id: 'g8',
        type: 'group',
        position: {
          x: -360,
          y: 990,
        },
        style: {
          width: 220,
          height: 130,
          backgroundColor: '#f4f4f5',
          border: "none",
          borderRadius : "10px"
        },
    },
    {
        id : '34' ,
        position  : {x : -350 , y: 1000},
        data: {label : 'trpc'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '35' ,
        position  : {x : -350 , y: 1040},
        data: {label : 'Zustand'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },
    {
        id : '36' ,
        position  : {x : -350 , y: 1080},
        data: {label : 'Redux'},
        style : {backgroundColor : "#ddedfa" , width :"200px" , border : "1px solid #4dabf7" , height: "30px" , display : "flex" , alignItems : "center" , justifyContent : "center" },
        parentId: '10'
    },




 ];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' , type : "smoothstep" ,  style: { strokeWidth: 2 } },
    {id: 'el-4' , source:'2' , target : '4', style: { strokeWidth: 2 }},
    {id: 'el-5' , source:'4' , target : '5',  style: { strokeWidth: 2 }},
    {id: 'el-11' , source:'6' , target : '8',  style: { strokeWidth: 2 }},
    {id: 'el-6' , source:'5' , target : '6' ,  style: { strokeWidth: 2 }},
    {id: 'el-12' , source:'2' , target : '13' ,  style: { strokeWidth: 2 } , animated : true , type : "smoothstep"},
    {id: 'el-7' , source:'6' , target : '7' ,  style: { strokeWidth: 2 }},
    {id: 'el-8' , source:'7' , target : '8' ,  style: { strokeWidth: 2 }},
    {id: 'el-9' , source:'8' , target : '9' ,  style: { strokeWidth: 2 }},
    { id: 'e1-13', source: '1', target: '11' , type : "smoothstep"  , animated : true ,  style: { strokeWidth: 2  , color : "black"}  },
    {id: 'el-12' , source:'2' , target : '18' ,  style: { strokeWidth: 1 } , animated : true , type : "smoothstep"},
    { id: 'e1-14', source: '4', target: '25' , type : "smoothstep"  , animated : true ,  style: { strokeWidth: 1 } , label : "intermediate"},
    { id: 'e1-15', source: '4', target: '21' , type : "smoothstep"  , animated : true ,  style: { strokeWidth: 1 } , label : "basic"},
    { id: 'e1-16', source: '6', target: '29' , type : "smoothstep"  , animated : true ,  style: { strokeWidth: 1 } },
    { id: 'e1-17', source: '6', target: '32' , type : "smoothstep"  , animated : true ,  style: { strokeWidth: 1 } },
    { id: 'e1-15', source: '8', target: '34' , type : "smoothstep"  , animated : true ,  style: { strokeWidth: 1 } },
];
 


const Roadmaps = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [node , setCurrentNode] = useState<any>()
    const onConnect = useCallback(
      (params : any ) => setEdges((eds) => addEdge(params, eds)),
      [setEdges],
    );

    const handleNodeClick = (event , node) => {
            setCurrentNode(node);
    }


    if(node?.data?.label === "React"){
        return <Playground />
    }
    
    return (
        <>
            <div  style={{ width: '100%', height: '100%'}}>
                <section className='text-center pt-[30px] text-2xl font-semibold mt-[60px]'>Frontend Developer Roadmap</section>
                <ReactFlow                 
                style={{width: "100%" , height: "100%" , paddingTop : "2000px"}}
                    nodes={nodes}
                    draggable={false}
                    nodesDraggable={false}
                    minZoom={1.5}
                    edges={edges}
                    edgesDraggable={false}
                    fitView
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    panOnScroll={true}
                    zoomOnScroll={false}
                    maskStrokeColor="#000000"
                    connectOnClick={false}
                    onNodeClick={handleNodeClick}
                />
            </div>
            
        </>
    )
}

export default Roadmaps