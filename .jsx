<VictoryChart domain={{ y: [0, 6] }}
  containerComponent={
    <VictoryVoronoiContainer
      labels={() => "Long, verbose labels"}
      labelComponent={
        <VictoryTooltip  dy={-7} constrainToVisibleArea />
      }
    />
  }
>
  <VictoryScatter
  	style={{ data: { fill: "red" }, labels: { fill: "red" } }}
    data={[
      { x: 0, y: 2 }, { x: 2, y: 3 }, { x: 4, y: 4 }, { x: 6, y: 5 }
    ]}
  />
  <VictoryScatter
    data={[
      { x: 2, y: 2 }, { x: 4, y: 3 }, { x: 6, y: 4 }, { x: 8, y: 5 }
    ]}
  />
</VictoryChart>
