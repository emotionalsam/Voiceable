import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

//components
import { Table, NameInput } from "./components";

function App() {
  const [chartData, setChartData] = useState();
  const [agentNames, setAgentNames] = useState([]);
  const [calls, setCalls] = useState([]);
  const [chosenAgent, setChosenAgent] = useState(-1);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/calls")
      .then((res) => setCalls(res.data.calls))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/agent")
      .then((res) => setAgentNames(res.data.agents))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let dateArray = [];
    let seriesData = [];

    if (chosenAgent >= 0) {
      dateArray = [
        ...new Set(
          calls
            .filter(
              ({ SupportedAgentID }) =>
                agentNames[chosenAgent]._id === SupportedAgentID
            )
            .map(({ Started }) => new Date(Started).toLocaleDateString("en-US"))
        ),
      ];

      let answered = [];
      let missed = [];

      dateArray.forEach((dateData) => {
        answered.push(
          calls.filter(
            ({ Started, Status, SupportedAgentID }) =>
              new Date(Started).toLocaleDateString("en-US") === dateData &&
              Status &&
              agentNames[chosenAgent]._id === SupportedAgentID
          ).length
        );

        missed.push(
          calls.filter(
            ({ Started, Status, SupportedAgentID }) =>
              new Date(Started).toLocaleDateString("en-US") === dateData &&
              !Status &&
              agentNames[chosenAgent]._id === SupportedAgentID
          ).length
        );
      });

      seriesData = [
        { name: "Answered", data: answered },
        {
          name: "Missed Calls",
          data: missed,
        },
      ];

      setChartData({
        test: calls.filter(({ _id }) => agentNames[chosenAgent]._id === _id),
        series: seriesData,

        options: {
          chart: {
            type: "bar",
            height: 350,
            stacked: true,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: true,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
            },
          },
          xaxis: {
            categories: dateArray,
          },
          legend: {
            position: "right",
            offsetY: 40,
          },
          fill: {
            opacity: 1,
          },
        },
      });
    }
  }, [chosenAgent]);

  useEffect(() => {
    console.log(calls);
    console.log(agentNames.map(({ _id }) => _id));
  }, [chosenAgent]);

  return (
    <div className="App">
      <NameInput data={agentNames} setChosenAgent={setChosenAgent} />
      {chosenAgent >= 0 && (
        <Table
          data={calls.filter(
            ({ SupportedAgentID }) =>
              agentNames[chosenAgent]._id === SupportedAgentID
          )}
          title={agentNames[chosenAgent].name}
        />
      )}
      {chartData && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
}

export default App;
