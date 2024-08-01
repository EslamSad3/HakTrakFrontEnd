

// import React, { useState } from "react";
// import { Box, Card, Divider } from "@mui/material";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import NdrPieChart from "../Scenes/NdrPieChart";
// import ExdrPieChart from "../Scenes/ExdrPieChart";
// import AtoBarChart from "../Scenes/AtoBarChart";
// import LeakedCreBarChart from "../Scenes/LeakedCreBarChart";
// import VulnsPieChart from "../Scenes/VulnsPieChart";
// import NdrBuBarChart from "../Scenes/NdrBuBarChart";
// import AttackSurfaceBarChart from "../Scenes/AttackSurfaceBarChart";
// import ExdrBuBarChart from "../Scenes/ExdrBuBarChart";

// const Charts = ({ theme, isNonMobile }) => {
//   const initialCharts = [
//     { id: "ndr-pie", component: <NdrPieChart /> },
//     { id: "exdr-pie", component: <ExdrPieChart /> },
//     { id: "vulns-pie", component: <VulnsPieChart /> },
//     { id: "ato-bar", component: <AtoBarChart /> },
//     { id: "leaked-cre-bar", component: <LeakedCreBarChart /> },
//     { id: "edr-xdr-bu-bar", component: <ExdrBuBarChart /> },
//     { id: "ndr-bu-bar", component: <NdrBuBarChart /> },
//     { id: "attack-surface-bar", component: <AttackSurfaceBarChart /> },
//   ];

//   const [charts, setCharts] = useState(initialCharts);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedCharts = Array.from(charts);
//     const [removed] = reorderedCharts.splice(result.source.index, 1);
//     reorderedCharts.splice(result.destination.index, 0, removed);

//     setCharts(reorderedCharts);
//   };

//   return (
//     <Box mt="5rem">
//       <Divider my="2rem" />
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="charts-droppable" direction="horizontal">
//           {(provided) => (
//             <Box
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//               display="grid"
//               gridTemplateColumns="repeat(2, 1fr)"
//               justifyContent="space-between"
//               rowGap="3rem"
//               columnGap="3rem"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
//                 width: "100%",
//                 height: "auto",
//               }}
//             >
//               {charts.map((chart, index) => (
//                 <Draggable key={chart.id} draggableId={chart.id} index={index}>
//                   {(provided) => (
//                     <Box
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                     >
//                       <ChartCard theme={theme}>{chart.component}</ChartCard>
//                     </Box>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </Box>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </Box>
//   );
// };

// const ChartCard = ({ children, theme }) => (
//   <Card
//     sx={{
//       backgroundImage: "none",
//       backgroundColor: theme.palette.background.alt,
//       borderRadius: "0.55rem",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       padding: "1rem",
//     }}
//   >
//     {children}
//   </Card>
// );

// export default Charts;



import React, { useState } from "react";
import { Box, Card, Divider } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NdrPieChart from "../Scenes/NdrPieChart";
import ExdrPieChart from "../Scenes/ExdrPieChart";
import AtoBarChart from "../Scenes/AtoBarChart";
import LeakedCreBarChart from "../Scenes/LeakedCreBarChart";
import VulnsPieChart from "../Scenes/VulnsPieChart";
import NdrBuBarChart from "../Scenes/NdrBuBarChart";
import AttackSurfaceBarChart from "../Scenes/AttackSurfaceBarChart";
import ExdrBuBarChart from "../Scenes/ExdrBuBarChart";

const palette = [
  "#455d7a", // Color 1
  "#f96d00", // Color 2
  "#680747", // Color 3
  "#2c5d63", // Color 4
  "#a55233", // Color 5
  "#18224b", // Color 6
  "#393e46", // Color 7
  "#295f4e", // Color 8
];

const Charts = ({ theme, isNonMobile }) => {
  const initialCharts = [
    { id: "ndr-pie", component: <NdrPieChart /> },
    { id: "exdr-pie", component: <ExdrPieChart /> },
    { id: "vulns-pie", component: <VulnsPieChart /> },
    { id: "ato-bar", component: <AtoBarChart /> },
    { id: "leaked-cre-bar", component: <LeakedCreBarChart /> },
    { id: "edr-xdr-bu-bar", component: <ExdrBuBarChart /> },
    { id: "ndr-bu-bar", component: <NdrBuBarChart /> },
    { id: "attack-surface-bar", component: <AttackSurfaceBarChart /> },
  ];

  const [charts, setCharts] = useState(initialCharts);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCharts = Array.from(charts);
    const [removed] = reorderedCharts.splice(result.source.index, 1);
    reorderedCharts.splice(result.destination.index, 0, removed);

    setCharts(reorderedCharts);
  };

  return (
    <Box mt="5rem">
      <Divider my="2rem" />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="charts-droppable" direction="horizontal">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              justifyContent="space-between"
              rowGap="3rem"
              columnGap="3rem"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                width: "100%",
                height: "auto",
              }}
            >
              {charts.map((chart, index) => (
                <Draggable key={chart.id} draggableId={chart.id} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ChartCard theme={theme} bgColor={palette[index]}>
                        {chart.component}
                      </ChartCard>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

const ChartCard = ({ children, theme, bgColor }) => (
  <Card
    sx={{
      backgroundImage: "none",
      backgroundColor: bgColor,
      borderRadius: "0.55rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem",
    }}
  >
    {children}
  </Card>
);

export default Charts;
