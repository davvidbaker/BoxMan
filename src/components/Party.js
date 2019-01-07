import * as React from 'react';
import { Link } from '@reach/router';
import * as d3 from 'd3';

const NetworkGraph = ({ nodes, links }) => {
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const svgRef = React.useRef(null);

  React.useEffect(() => {
    if (svgRef.current) {
      let edgepaths,
        edgelabels,
        rx,
        ry;
      let svg = d3.select('svg'),
        width = +svg.attr('width'),
        height = +svg.attr('height'),
        node,
        link;

      console.log('🔥  svg', svg);

      svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 13)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 13)
        .attr('markerHeight', 13)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#999')
        .style('stroke', 'none');

      const simulation = d3
        .forceSimulation()
        .force(
          'link',
          d3
            .forceLink()
            .id(d => d.id)
            .distance(100)
            .strength(1),
        )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));

      update(links, nodes);

      // eslint-disable-next-line
      function update(links, nodes) {
        link = svg
          .selectAll('.link')
          .data(links)
          .enter()
          .append('line')
          .attr('class', 'link')
          .attr('marker-end', 'url(#arrowhead)');

        link.append('title').text(d => d.type);

        edgepaths = svg
          .selectAll('.edgepath')
          .data(links)
          .enter()
          .append('path')
          .attr('class', 'edgepath')
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
          .attr('id', (d, i) => `edgepath${i}`)
          .style('pointer-events', 'none');

        edgelabels = svg
          .selectAll('.edgelabel')
          .data(links)
          .enter()
          .append('text')
          .style('pointer-events', 'none')
          .attr('class', 'edgelabel')
          .attr('id', (d, i) => `edgelabel${i}`)
          .attr('font-size', 10)
          .attr('fill', '#aaa');

        edgelabels
          .append('textPath')
          .attr('xlink:href', (d, i) => `#edgepath${i}`)
          .style('text-anchor', 'middle')
          .style('pointer-events', 'none')
          .attr('startOffset', '50%')
          .text(d => d.type);

        node = svg
          .selectAll('.node')
          .data(nodes)
          .enter()
          .append('g')
          .attr('class', 'node')
          .call(
            d3
              .drag()
              .on('start', dragstarted)
              .on('drag', dragged),
            // .on("end", dragended)
          );

        node
          .append('circle')
          .attr('r', 5)
          .style('fill', (d, i) => colors(i));

        node.append('title').text(d => d.id);

        node
          .append('text')
          .attr('dy', -3)
          .text(d => `${d.username}:${d.role}`);

        simulation.nodes(nodes).on('tick', ticked);

        simulation.force('link').links(links);
      }

      // eslint-disable-next-line
      function ticked() {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node.attr('transform', d => `translate(${d.x}, ${d.y})`);

        edgepaths.attr(
          'd',
          d => `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`,
        );

        edgelabels.attr('transform', function (d) {
          if (d.target.x < d.source.x) {
            const bbox = this.getBBox();

            rx = bbox.x + bbox.width / 2;
            ry = bbox.y + bbox.height / 2;
            return `rotate(180 ${rx} ${ry})`;
          }
          return 'rotate(0)';
        });
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
    }
  });

  return <svg ref={svgRef} width={960} height={600} />;
};

const Party = ({
  partyName, remoteStreams, peers, yourself
}) => {
  const nodes = [...peers, yourself];

  /* ⚠️ naive */
  let links = [];
  nodes.forEach(p1 => {
    nodes.forEach(p2 => {
      links = p1.username !== p2.username
        ? [
          ...links,
          { source: p1.username, target: p2.username, type: 'IS_A' },
        ]
        : links;
    });
  });

  return (
    <div
      css="
      margin: 1em;
      .link { stroke: #999; stroke-opacity: .6; stroke-width: 1px; }
    "
    >
      <h1>
        <span css="color: white; font-size: 0.75em;">Your Party:</span>
        {' '}
        {partyName}
      </h1>
      {peers.length > 0 ? (
        <>
          <div css="position: absolute;">
            <NetworkGraph
              links={links}
              nodes={nodes.map(p => ({
                id: p.username,
                username: p.username,
                role: p.role,
              }))}
            />
          </div>
          <ul>
            {peers.map(p => (
              <li key={p.username}>{p.username}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>There is no one else in your party.</p>
      )}
    </div>
  );
};

export default Party;
