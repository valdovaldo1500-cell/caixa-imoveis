"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

interface MapProperty {
  id: number;
  cidade: string;
  bairro: string | null;
  preco: string | null;
  desconto: string | null;
  modalidadeVenda: string | null;
  linkCaixa: string | null;
  lat: string;
  lng: string;
}

interface PropertyMapProps {
  properties: MapProperty[];
}

function getMarkerColor(desconto: string | null): string {
  if (!desconto) return "#ef4444"; // red
  const d = parseFloat(desconto);
  if (d >= 50) return "#22c55e"; // green
  if (d >= 30) return "#eab308"; // yellow
  return "#ef4444"; // red
}

function createClusterIcon(cluster: L.MarkerCluster): L.DivIcon {
  const count = cluster.getChildCount();
  let size = 36;
  let bg = "rgba(34,197,94,0.85)";
  if (count > 50) { size = 48; bg = "rgba(239,68,68,0.85)"; }
  else if (count > 20) { size = 44; bg = "rgba(234,179,8,0.85)"; }
  else if (count > 5) { size = 40; bg = "rgba(34,197,94,0.85)"; }

  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      display:flex;align-items:center;justify-content:center;
      border-radius:50%;
      background:${bg};
      color:white;font-weight:700;font-size:13px;
      border:3px solid rgba(255,255,255,0.5);
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
    ">${count}</div>`,
    className: "",
    iconSize: L.point(size, size),
    iconAnchor: L.point(size / 2, size / 2),
  });
}

function formatBRL(value: string | null): string {
  if (!value) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  return (
    <MapContainer
      center={[-29.95, -51.15]}
      zoom={7}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon}>
        {properties.map((p) => {
          const color = getMarkerColor(p.desconto);
          const lat = parseFloat(p.lat);
          const lng = parseFloat(p.lng);
          if (isNaN(lat) || isNaN(lng)) return null;
          return (
            <CircleMarker
              key={p.id}
              center={[lat, lng]}
              radius={7}
              pathOptions={{
                fillColor: color,
                fillOpacity: 0.9,
                color: "rgba(0,0,0,0.5)",
                weight: 2,
              }}
            >
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <p style={{ fontWeight: "bold", marginBottom: 4 }}>
                    {p.cidade}
                    {p.bairro ? ` — ${p.bairro}` : ""}
                  </p>
                  <p>
                    <span style={{ color: "#555" }}>Preço: </span>
                    <strong>{formatBRL(p.preco)}</strong>
                  </p>
                  {p.desconto && (
                    <p>
                      <span style={{ color: "#555" }}>Desconto: </span>
                      <strong style={{ color: color }}>
                        {parseFloat(p.desconto).toFixed(0)}%
                      </strong>
                    </p>
                  )}
                  {p.modalidadeVenda && (
                    <p style={{ color: "#555", fontSize: 12, marginTop: 4 }}>
                      {p.modalidadeVenda}
                    </p>
                  )}
                  {p.linkCaixa && (
                    <a
                      href={p.linkCaixa}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: 8,
                        color: "#2563eb",
                        fontSize: 13,
                      }}
                    >
                      Ver na Caixa →
                    </a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
