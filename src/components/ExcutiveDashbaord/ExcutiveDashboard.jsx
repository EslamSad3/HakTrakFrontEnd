// import React from "react";
// import { Box, Grid } from "@mui/material";
// import SecurityPostureScore from "../Scenes/SecurityPostureScore";
// import QuarterlyIncidentAlertVolume from "../Scenes/QuarterlyIncidentAlertVolume";
// import ThreatCompositionOverview from "../Scenes/ThreatCompositionOverview";
// import SecurityBreachIndicators from "../Scenes/SecurityBreachIndicators";
// import NonComplianceGapsOverview from "../Scenes/NonComplianceGapsOverview";
// import CybersecurityTrends from "../Scenes/CybersecurityTrends";
// import DigitalRiskIntelligence from "../Scenes/DigitalRiskIntelligence";
// import TrendTimeToDetectRespond from "../Scenes/TrendTimeToDetectRespond";

// const ExcutiveDashboard = () => (
//   <Box sx={{ flexGrow: 1, padding: 2 }}>
//     <Grid container spacing={2}>
//       <Grid item xs={12} md={4}>
//         <SecurityPostureScore />
//       </Grid>
//       <Grid item xs={12} md={8}>
//         <QuarterlyIncidentAlertVolume />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <ThreatCompositionOverview />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <SecurityBreachIndicators />
//       </Grid>
//       <Grid item xs={12}>
//         <NonComplianceGapsOverview />
//       </Grid>
//       <Grid item xs={12}>
//         <CybersecurityTrends />
//       </Grid>
//       <Grid item xs={3}>
//         <DigitalRiskIntelligence />
//       </Grid>

//       <Grid item xs={9}>
//         <TrendTimeToDetectRespond />
//       </Grid>
//     </Grid>
//   </Box>
// );

// export default ExcutiveDashboard;

import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SecurityPostureScore from "../Scenes/SecurityPostureScore";
import QuarterlyIncidentAlertVolume from "../Scenes/QuarterlyIncidentAlertVolume";
import ThreatCompositionOverview from "../Scenes/ThreatCompositionOverview";
import SecurityBreachIndicators from "../Scenes/SecurityBreachIndicators";
import NonComplianceGapsOverview from "../Scenes/NonComplianceGapsOverview";
import CybersecurityTrends from "../Scenes/CybersecurityTrends";
import DigitalRiskIntelligence from "../Scenes/DigitalRiskIntelligence";
import TrendTimeToDetectRespond from "../Scenes/TrendTimeToDetectRespond";

const initialItems = [
  { id: "1", component: <SecurityPostureScore />, xs: 12, md: 4 },
  { id: "2", component: <QuarterlyIncidentAlertVolume />, xs: 12, md: 8 },
  { id: "3", component: <ThreatCompositionOverview />, xs: 12, md: 6 },
  { id: "4", component: <SecurityBreachIndicators />, xs: 12, md: 6 },
  { id: "5", component: <NonComplianceGapsOverview />, xs: 12, md: 12 },
  { id: "6", component: <CybersecurityTrends />, xs: 12, md: 12 },
  { id: "7", component: <DigitalRiskIntelligence />, xs: 12, md: 3 },
  { id: "8", component: <TrendTimeToDetectRespond />, xs: 12, md: 9 },
];

const ExecutiveDashboard = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-dashboard" direction="horizontal">
          {(provided) => (
            <Grid
              container
              spacing={2}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <Grid
                      item
                      xs={item.xs}
                      md={item.md}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.component}
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ExecutiveDashboard;
