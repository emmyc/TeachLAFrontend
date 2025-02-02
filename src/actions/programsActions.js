export const SET_PROGRAM_CODE = "SET_PROGRAM_CODE";
export function setProgramCode(program, value) {
  return { type: SET_PROGRAM_CODE, program, value };
}

export const SET_PROGRAM_LANGUAGE = "SET_PROGRAM_LANGUAGE";
export function setProgramLanguage(program, value) {
  return { type: SET_PROGRAM_LANGUAGE, program, value };
}

export const SET_PROGRAM_NAME = "SET_PROGRAM_NAME";
export function setProgramName(program, value) {
  return { type: SET_PROGRAM_NAME, program, value };
}

export const SET_PROGRAM_THUMBNAIL = "SET_PROGRAM_THUMBNAIL";
export function setProgramThumbnail(program, value) {
  return { type: SET_PROGRAM_THUMBNAIL, program, value };
}

export const DELETE_PROGRAM = "DELETE_PROGRAM";
export function deleteProgram(program) {
  return { type: DELETE_PROGRAM, program };
}

export const LOAD_PROGRAMS = "LOAD_PROGRAMS";
export function loadPrograms(programs) {
  return { type: LOAD_PROGRAMS, programs };
}

export const CLEAR_PROGRAMS = "CLEAR_PROGRAMS";
export function clearPrograms() {
  return { type: CLEAR_PROGRAMS };
}

export const SET_PROGRAM_DIRTY = "SET_PROGRAM_DIRTY";
export function setProgramDirty(program, value) {
  return { type: SET_PROGRAM_DIRTY, program, value };
}

export const ADD_PROGRAM = "ADD_PROGRAM";
export function addProgram(program, data) {
  return { type: ADD_PROGRAM, program, data };
}
