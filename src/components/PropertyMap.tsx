"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

function createColoredIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: ${color};
      border: 2px solid rgba(0,0,0,0.4);
      box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
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
      <MarkerClusterGroup chunkedLoading>
        {properties.map((p) => {
          const color = getMarkerColor(p.desconto);
          const icon = createColoredIcon(color);
          const lat = parseFloat(p.lat);
          const lng = parseFloat(p.lng);
          if (isNaN(lat) || isNaN(lng)) return null;
          return (
            <Marker key={p.id} position={[lat, lng]} icon={icon}>
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
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
