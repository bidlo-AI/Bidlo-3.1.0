'use client';

// Demo schema for a Notion-like page hierarchy with 4 sections.
//
// This structure is intentionally minimal but expressive enough to support:
// - Reordering sections by dragging section labels (update `sectionOrder`).
// - Reordering and moving pages within and across sections (update a page's
//   `sectionId`, `parentId`, and `order`).
// - Nesting pages under other pages to create sub-pages (set `parentId`).
// - A virtual "Favorites" section that lists pages flagged as favorites while
//   preserving their canonical location in another section.
//
// Notes
// - Siblings are defined as pages that share the same `parentId` and `sectionId`.
// - `order` is a simple integer for display ordering among siblings.
// - Moving a page under another page will typically also set the child's
//   `sectionId` to match the parent so the tree remains in a single section.
// - Favorites are derived from `isFavorite === true` and ordered by
//   `favoritePageOrder`.

//#region Types
export type SectionId = string;
export type PageId = string;

export type SectionType = 'favorites' | 'private' | 'shared' | 'public';

export interface Section {
  id: SectionId;
  type: SectionType;
  title: string;
  order: number; // visual order fallback; authoritative order is `sectionOrder`
  isVirtual?: boolean; // true only for Favorites
}

export interface Page {
  id: PageId;
  title: string;
  sectionId: SectionId; // owning section (except Favorites which is virtual)
  parentId: PageId | null; // parent page id for nesting; null = top-level in section
  order: number; // order among siblings (same sectionId + parentId)
  isFavorite?: boolean; // included in Favorites if true
}

export interface WorkspaceData {
  sectionsById: Record<SectionId, Section>;
  sectionOrder: SectionId[]; // authoritative section ordering for the UI
  pagesById: Record<PageId, Page>;
  favoritePageOrder: PageId[]; // ordering for virtual Favorites
}
//#endregion

//#region Demo Data
const sFavorites: SectionId = 's_favorites';
const sPrivate: SectionId = 's_private';
const sShared: SectionId = 's_shared';
const sPublic: SectionId = 's_public';

const pPersonal: PageId = 'p_personal';
const pJournal: PageId = 'p_journal';
const pGoals: PageId = 'p_goals';
const pDrafts: PageId = 'p_drafts';

const pTeamHome: PageId = 'p_team_home';
const pRoadmap: PageId = 'p_roadmap';
const pMeetingNotes: PageId = 'p_meeting_notes';

const pDocs: PageId = 'p_docs';
const pGettingStarted: PageId = 'p_getting_started';

export const demoWorkspace: WorkspaceData = {
  sectionsById: {
    [sFavorites]: {
      id: sFavorites,
      type: 'favorites',
      title: 'Favorites',
      order: 0,
      isVirtual: true,
    },
    [sPrivate]: {
      id: sPrivate,
      type: 'private',
      title: 'Private',
      order: 1,
    },
    [sShared]: {
      id: sShared,
      type: 'shared',
      title: 'Shared',
      order: 2,
    },
    [sPublic]: {
      id: sPublic,
      type: 'public',
      title: 'Public',
      order: 3,
    },
  },
  sectionOrder: [sFavorites, sPrivate, sShared, sPublic],
  pagesById: {
    // Private
    [pPersonal]: {
      id: pPersonal,
      title: 'Personal',
      sectionId: sPrivate,
      parentId: null,
      order: 0,
      isFavorite: true,
    },
    [pJournal]: {
      id: pJournal,
      title: 'Journal',
      sectionId: sPrivate,
      parentId: pPersonal,
      order: 0,
    },
    [pGoals]: {
      id: pGoals,
      title: 'Goals',
      sectionId: sPrivate,
      parentId: pPersonal,
      order: 1,
    },
    [pDrafts]: {
      id: pDrafts,
      title: 'Drafts',
      sectionId: sPrivate,
      parentId: null,
      order: 1,
    },

    // Shared
    [pTeamHome]: {
      id: pTeamHome,
      title: 'Team Home',
      sectionId: sShared,
      parentId: null,
      order: 0,
    },
    [pRoadmap]: {
      id: pRoadmap,
      title: 'Roadmap',
      sectionId: sShared,
      parentId: pTeamHome,
      order: 0,
      isFavorite: true,
    },
    [pMeetingNotes]: {
      id: pMeetingNotes,
      title: 'Meeting Notes',
      sectionId: sShared,
      parentId: pTeamHome,
      order: 1,
    },

    // Public
    [pDocs]: {
      id: pDocs,
      title: 'Docs',
      sectionId: sPublic,
      parentId: null,
      order: 0,
    },
    [pGettingStarted]: {
      id: pGettingStarted,
      title: 'Getting Started',
      sectionId: sPublic,
      parentId: pDocs,
      order: 0,
      isFavorite: true,
    },
  },
  // The Favorites list is a virtual view; order is independent of a page's
  // order within its owning section. Users can drag to reorder favorites here.
  favoritePageOrder: [pRoadmap, pPersonal, pGettingStarted],
};
//#endregion

export const Pages = () => {
  return (
    <div className="flex flex-col gap-px">
      <DraggableSection label="label" />
    </div>
  );
};

export const DraggableSection = ({ label }: { label: string }) => {
  return (
    <div>
      <div role="button">{label}</div>
      <div>pages for this section</div>
    </div>
  );
};
