
import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
      <p>© {currentYear} Zymatric. All rights reserved.</p>
    </footer>
  );
}
