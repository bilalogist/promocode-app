@ECHO OFF
PUSHD .
FOR /R %%d IN (.) DO (
cd "%%d"
IF EXIST *.js (
REN *.js *.ts
)
)
POPD