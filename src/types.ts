export interface IDataElectionRow {
  0: string,
  1: number,
  2?: number
}

export interface IDataElection {
  [propName: string]: {
    t: number,
    e: number,
    v: number,
    r: Array<IDataElectionRow>
  };
}

export interface IDataParty {
  0: string,
  1: string
}

export interface IDataParties {
  [propName: string]: IDataParty
}

export interface IParty {
  id: string,
  name: string,
  swatch: string,
  votes: number,
  electorates: number
}

export interface IElection {
  totalVoters: number,
  enrolledVoters: number,
  activeVoters: number,
  parties: Array<IParty>
}

export interface ILayoutProps {
  title: string,
  description: string,
  children: any
}

export interface IMMPReviewProps {
  year: string,
  threshold: number,
  allowOverhang: boolean,
  allowTagAlong: boolean,
  tagAlongSeats: number
}

export interface INonVotersProps {
  year: string,
  party: string,
  votes: number,
  includeNotEnrolled: boolean
}

export interface IElectionProps {
  //
}

export interface IInfoTipProps {
  href: string
}

export interface IResultRowProps {
  id: string,
  name: string,
  swatch: string,
  votes: number,
  electorateSeats: number,
  listSeats: number,
  totalSeats: number,
  seatDifference: number
}

export interface IResultTableProps {
  gallagherIndex: number,
  gallagherIndexDifference: number,
  rows: Array<IResultRowProps>,
  seatDifference: number,
  totalElectorateSeats: number,
  totalListSeats: number,
  totalSeats: number,
  totalVotes: number
}
