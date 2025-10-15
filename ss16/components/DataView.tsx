import { toggleViewMode } from "@/redux/slice/view-mode.slice";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GridView from "./GridView";
import ListView from "./ListView";

const sampleData = [
  { id: 1, name: "Sản phẩm A" },
  { id: 2, name: "Sản phẩm B" },
  { id: 3, name: "Sản phẩm C" },
];

export default function DataView() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.viewMode.mode);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => dispatch(toggleViewMode())}>
        Chuyển sang chế độ {mode === "list" ? "Lưới" : "Danh sách"}
      </button>

      <div style={{ marginTop: 20 }}>
        {mode === "list" ? (
          <ListView data={sampleData} />
        ) : (
          <GridView data={sampleData} />
        )}
      </div>
    </div>
  );
}
