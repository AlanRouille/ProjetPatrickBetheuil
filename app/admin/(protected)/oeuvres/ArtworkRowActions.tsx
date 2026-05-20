"use client";

import {
  deleteArtworkAction,
  setArtworkStatusAction,
} from "./actions";

export function ArtworkRowActions({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {status !== "SOLD" && (
        <form action={setArtworkStatusAction}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="status" value="SOLD" />
          <button
            type="submit"
            className="rounded-sm border border-white/15 px-3 py-2 text-xs text-[#F0F0EE] transition hover:border-[#F49C1A]"
          >
            Marquer vendu
          </button>
        </form>
      )}

      {status !== "AVAILABLE" && (
        <form action={setArtworkStatusAction}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="status" value="AVAILABLE" />
          <button
            type="submit"
            className="rounded-sm border border-white/15 px-3 py-2 text-xs text-[#F0F0EE] transition hover:border-[#F49C1A]"
          >
            Marquer disponible
          </button>
        </form>
      )}

      <form
        action={deleteArtworkAction}
        onSubmit={(event) => {
          if (
            !window.confirm(
              "Supprimer cette œuvre ? Cette action est définitive."
            )
          ) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="rounded-sm border border-red-400/40 px-3 py-2 text-xs text-red-100 transition hover:border-red-300 hover:bg-red-950/40"
        >
          Supprimer
        </button>
      </form>
    </div>
  );
}
