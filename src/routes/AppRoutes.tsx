import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../views/Home/Home";
import GameBoard from "../views/GameBoard/GameBoard";
import NotFound from "../views/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="game" element={<GameBoard />} />

      {/* Not Found Routes */}
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="404" />} />
    </Routes>
  );
}

export default AppRoutes;
